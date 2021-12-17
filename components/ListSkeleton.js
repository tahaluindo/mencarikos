import React from 'react'
const skeletonArr = [1, 2, 3, 4, 5, 6, 7, 8]
const ListSkeleton = () => <div className="divide-y xs:mx-2">
    {skeletonArr.map((item, index) =>
        <div key={index} className="w-full py-2 animate-pulse flex space-x-2">
            <div className="bg-gray-400 h-8 w-8" />
            <div className="bg-gray-400 h-8 w-full" />
        </div>
    )}
</div>
export default ListSkeleton