export const navLinkClasses = ({ isActive }) =>
    `flex items-center gap-3 py-1 px-2  transition-all rounded-sm duration-200 font-medium ${isActive
        ? "bg-white text-primary shadow-sm"
        : "text-gray-300 hover:bg-gray-100 hover:text-gray-900"
    }`;