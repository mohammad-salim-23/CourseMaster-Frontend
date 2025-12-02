import Link from "next/link";

export default function CourseCard({ course }: any) {
  return (
    <div className="border p-4 rounded-xl shadow hover:shadow-lg transition">
      <h2 className="text-xl font-semibold">{course.title}</h2>
      <p className="text-gray-600 mt-2">{course.instructor}</p>

      <p className="font-bold mt-3">${course.price}</p>

      <Link
        href={`/course/${course._id}`}
        className="mt-4 inline-block bg-indigo-600 text-white px-4 py-2 rounded-lg"
      >
        View Details
      </Link>
    </div>
  );
}
