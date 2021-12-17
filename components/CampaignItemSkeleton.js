import React from 'react'
const skeletonArr = [1, 2, 3, 4, 5, 6, 7, 8]
const CampaignItemSkeleton = () => <div>
    {
        skeletonArr.map((item, index) =>
            <div key={index} className="py-2 mx-3 mr-3">
                <div className="animate-pulse space-x-4">
                    <div className="bg-gray-400 h-64 w-full"/>
                    <div className="space-y-4 pt-2">
                        <div className="h-6 bg-gray-400 w-1/4"/>
                        <div className="space-y-1 mr-3">
                            <div className="h-4 bg-gray-400"/>
                            <div className="h-4 bg-gray-400 w-5/6"/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
</div>
export default CampaignItemSkeleton