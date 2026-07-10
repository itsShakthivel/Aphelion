import LoadingSkeleton from "../common/LoadingSkeleton";

function DashboardSkeleton() {
    return (
        <div className="space-y-6">

            <LoadingSkeleton className="h-32 w-full" />

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {[...Array(4)].map((_, index) => (
                    <LoadingSkeleton
                        key={index}
                        className="h-40 w-full"
                    />
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <LoadingSkeleton className="h-96 w-full" />
                <LoadingSkeleton className="h-96 w-full" />
            </div>

            <LoadingSkeleton className="h-96 w-full" />

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {[...Array(4)].map((_, index) => (
                    <LoadingSkeleton
                        key={index}
                        className="h-32 w-full"
                    />
                ))}
            </div>

            <LoadingSkeleton className="h-96 w-full" />

        </div>
    );
}

export default DashboardSkeleton;