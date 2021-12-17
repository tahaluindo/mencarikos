import React from 'react'
const skeletonArr = [1, 2, 3, 4, 5, 6, 7, 8]
const CampaignItemListSkeleton = () => <div className="mx-3 my-2 divide-y">
    {
        skeletonArr.map((item, index) =>
            <div key={index} className="w-full mx-auto py-2">
                <div className="animate-pulse flex space-x-4">
                    <div className="bg-gray-400 h-24 w-20" />
                    <div className="flex-1 space-y-4 py-1">
                        <div className="h-5 bg-gray-400 w-1/4" />
                        <div className="space-y-1">
                            <div className="h-4 bg-gray-400" />
                            <div className="h-4 bg-gray-400 w-5/6" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
</div>
export default CampaignItemListSkeleton