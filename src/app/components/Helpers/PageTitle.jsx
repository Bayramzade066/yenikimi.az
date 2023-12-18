import BreadcrumbCom from "../BreadcrumbCom";

export default function PageTitle({ title, breadcrumb = [] }) {
  return (
    <div className="page-title-wrapper bg-gray-100 w-full h-[130px] py-5">
      <div className="container-x mx-auto">
        <div className="mb-5">
          <BreadcrumbCom paths={breadcrumb} />
        </div>
        <div className="flex justify-center">
          <h1 className="text-3xl font-semibold text-qblack">{title}</h1>
        </div>
      </div>
    </div>
  );
}
