const CardFooter = ({ children, className = "" }) => {

    return (

        <div
            className={cn(
                "mt-6 pt-4 border-t border-slate-200/60",
                className
            )}
        >
            {children}
        </div>

    );

};

export default CardFooter;