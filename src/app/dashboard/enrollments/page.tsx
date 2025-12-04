import { getToken } from "@/src/services/AuthService";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { getUserEnrollments } from "@/src/services/EnrollmentService";


export default async function MyEnrollmentsPage() {
  
  const token = await getToken();
  if (!token) {
    // not logged in: redirect or render empty state
    return (
      <div className="container mx-auto py-10">
        <h2 className="text-xl font-semibold">You are not logged in</h2>
        <p>Please <a href="/auth/login" className="text-teal-600">login</a> to view your courses.</p>
      </div>
    );
  }

  // decode token to get user id/email (depends on what you put in token)
  const decoded: any = jwt.decode(token);
  const userId = decoded?.userId || decoded?.userEmail || decoded?.id;
  if (!userId) {
    return <div>Invalid token</div>;
  }

  const res = await getUserEnrollments(userId);
  const enrollments = res?.data || [];

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">My Enrolled Courses</h1>

      <div className="space-y-4">
        {enrollments.length === 0 && <p>You have not enrolled in any course yet.</p>}

        {enrollments.map((en: any) => (
          <div key={en._id} className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">{en.course?.title}</h3>
              <p className="text-sm text-gray-600">{en.course?.instructor}</p>

              {/* Progress bar */}
              <div className="mt-2">
                <div className="w-64 h-3 bg-gray-200 rounded">
                  <div
                    className="h-full bg-teal-600 rounded"
                    style={{ width: `${Math.round(en.progress || 0)}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">{Math.round(en.progress || 0)}% completed</p>
              </div>
            </div>

            <div className="flex gap-2">
              <a href={`/dashboard/enrollments/${en.course._id}`} className="px-3 py-2 bg-teal-600 text-white rounded">Open Course</a>
             
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
