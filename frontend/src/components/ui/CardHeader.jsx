const CardHeader = ({ children, className = "" }) => {

    return (

        <div
            className={cn(
                "mb-6 flex items-start justify-between",
                className
            )}
        >
            {children}
        </div>

    );

};

export default CardHeader;