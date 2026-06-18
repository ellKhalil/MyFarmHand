import { Link } from '@inertiajs/react';

export default function Pagination({ links }) {
    if (!links || links.length <= 3) return null; // Don't render if only Previous and Next

    return (
        <div className="flex flex-wrap justify-center mt-4 mb-4 gap-1">
            {links.map((link, index) => {
                const isActive = link.active;
                const isNull = link.url === null;

                const baseClasses = "px-4 py-2 border text-sm font-medium rounded-md transition-colors";
                const activeClasses = isActive 
                    ? "bg-green-700 text-white border-green-700" 
                    : "bg-white text-gray-700 hover:bg-gray-50 border-gray-300";
                const disabledClasses = "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200";

                if (isNull) {
                    return (
                        <span 
                            key={index} 
                            className={`${baseClasses} ${disabledClasses}`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    );
                }

                return (
                    <Link
                        key={index}
                        href={link.url}
                        className={`${baseClasses} ${activeClasses}`}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                );
            })}
        </div>
    );
}
