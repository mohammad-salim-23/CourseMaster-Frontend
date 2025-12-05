
import ModulePageClient from "@/src/components/modules/Course/ModulePageClient";

interface PageProps {
  params: {
    courseId: string;
    moduleId: string;
  };
}

export default function ModulePage({ params }: PageProps) {

  return <ModulePageClient params={params} />;
}
