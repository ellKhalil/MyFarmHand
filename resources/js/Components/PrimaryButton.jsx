export default function PrimaryButton({
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center justify-center rounded-xl border border-transparent bg-green-700 px-6 py-3 text-sm font-bold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-green-800 focus:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 active:bg-green-900 shadow-sm ${
                    disabled ? 'opacity-50' : ''
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
