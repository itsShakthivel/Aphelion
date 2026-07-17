const CardBody = ({ children, className = "" }) => {

    return (

        <div
            className={cn(
                "space-y-4",
                className
            )}
        >
            {children}
        </div>

    );

};

export default CardBody;