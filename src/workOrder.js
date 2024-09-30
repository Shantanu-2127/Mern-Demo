import React, { useState } from "react";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus,
} from "lucide-react";

const WorkOrderCreation = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [expandedPackages, setExpandedPackages] = useState({});
  const [expandedActivities, setExpandedActivities] = useState({});
  const [selectedItems, setSelectedItems] = useState({});

  const packages = [
    {
      id: "civil",
      name: "Civil",
      rate: 100,
      total: 1000,
      activities: [
        {
          id: "activity1",
          name: "Activity 1",
          rate: 50,
          total: 500,
          workItems: [
            { id: "item1", name: "Work Item 1", rate: 25, total: 250 },
            { id: "item2", name: "Work Item 2", rate: 25, total: 250 },
          ],
        },
        {
          id: "activity2",
          name: "Activity 2",
          rate: 50,
          total: 500,
          workItems: [
            { id: "item3", name: "Work Item 3", rate: 25, total: 250 },
            { id: "item4", name: "Work Item 4", rate: 25, total: 250 },
          ],
        },
      ],
    },
    {
      id: "electrical",
      name: "Electrical",
      rate: 120,
      total: 1200,
      activities: [
        {
          id: "activity3",
          name: "Activity 3",
          rate: 60,
          total: 600,
          workItems: [
            { id: "item5", name: "Work Item 5", rate: 30, total: 300 },
            { id: "item6", name: "Work Item 6", rate: 30, total: 300 },
          ],
        },
      ],
    },
  ];

  const toggleExpandPackage = (id) => {
    setExpandedPackages((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleExpandActivity = (id) => {
    setExpandedActivities((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleSelectAll = () => {
    const allSelected = packages.every((pkg) =>
      pkg.activities.every((activity) =>
        activity.workItems.every((item) => selectedItems[item.id])
      )
    );

    const newSelectedItems = {};
    packages.forEach((pkg) => {
      pkg.activities.forEach((activity) => {
        activity.workItems.forEach((item) => {
          newSelectedItems[item.id] = !allSelected;
        });
      });
    });

    setSelectedItems(newSelectedItems);
  };

  const toggleSelectPackage = (packageId) => {
    const newSelectedItems = { ...selectedItems };
    packages
      .find((pkg) => pkg.id === packageId)
      .activities.forEach((activity) => {
        activity.workItems.forEach((item) => {
          newSelectedItems[item.id] = !selectedItems[item.id];
        });
      });
    setSelectedItems(newSelectedItems);
  };

  const toggleSelectActivity = (packageId, activityId) => {
    const newSelectedItems = { ...selectedItems };
    packages
      .find((pkg) => pkg.id === packageId)
      .activities.find((activity) => activity.id === activityId)
      .workItems.forEach((item) => {
        newSelectedItems[item.id] = !selectedItems[item.id];
      });
    setSelectedItems(newSelectedItems);
  };

  const toggleSelectItem = (itemId) => {
    setSelectedItems((prev) => ({ ...prev, [itemId]: !prev[itemId] }));
  };

  const isAllSelected = packages.every((pkg) =>
    pkg.activities.every((activity) =>
      activity.workItems.every((item) => selectedItems[item.id])
    )
  );

  const isPackageSelected = (packageId) =>
    packages
      .find((pkg) => pkg.id === packageId)
      .activities.every((activity) =>
        activity.workItems.every((item) => selectedItems[item.id])
      );

  const isActivitySelected = (packageId, activityId) =>
    packages
      .find((pkg) => pkg.id === packageId)
      .activities.find((activity) => activity.id === activityId)
      .workItems.every((item) => selectedItems[item.id]);

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center mb-4">
        <div className="flex items-center gap-1 flex-grow">
          <span>
            <ChevronLeft size={24} />
          </span>
          <h1 className="text-2xl font-bold ">Create Workorder</h1>
        </div>
        <div>
          <button className="px-10 py-2 bg-[#4FD1C5] text-white rounded-md ml-auto hover:scale-[1.1] ">
            Save
          </button>
        </div>
      </div>

      <div className="mb-7 ">
        <button
          className={`px-5 md:px-20  py-2 mr-2 focus:outline-none${
            activeTab === "overview"
              ? "text-black border-b-[3px] border-[#4FD1C5]"
              : "text-gray-500 hover:text-gray-700 border-b-[3px]"
          }`}
          onClick={() => setActiveTab("overview")}
        >
          Overview
        </button>
        <button
          className={`px-5 md:px-20 py-2 focus:outline-none ${
            activeTab === "other"
              ? "text-black border-b-[3px] border-[#4FD1C5]"
              : "text-gray-500 hover:text-gray-700 border-b-[3px]"
          }`}
          onClick={() => setActiveTab("other")}
        >
          Other
        </button>
      </div>

      {activeTab === "overview" ? (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#C8EAF5]">
              <th className="border p-2 text-left">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={toggleSelectAll}
                  className="mr-2"
                />
                Packages
              </th>
              <th className="border p-2 text-left">Rate</th>
              <th className="border p-2 text-left">Total</th>
              <th className="border p-2"></th>
            </tr>
          </thead>
          <tbody>
            {packages.map((pkg) => (
              <React.Fragment key={pkg.id}>
                <tr className="border-b ">
                  <td className="p-2">
                    <input
                      type="checkbox"
                      checked={isPackageSelected(pkg.id)}
                      onChange={() => toggleSelectPackage(pkg.id)}
                      className="mr-2"
                    />
                    {pkg.name}
                  </td>
                  <td className=" p-2 ">${pkg.rate}</td>
                  <td className="p-2 ">${pkg.total}</td>
                  <td className=" p-2 text-center">
                    <button onClick={() => toggleExpandPackage(pkg.id)}>
                      {expandedPackages[pkg.id] ? (
                        <Minus size={20} color="#4FD1C5" />
                      ) : (
                        <Plus size={24} color="#4FD1C5" />
                      )}
                    </button>
                  </td>
                </tr>
                {expandedPackages[pkg.id] &&
                  pkg.activities.map((activity) => (
                    <React.Fragment key={activity.id}>
                      <tr className="bg-gray-100">
                        <td className=" p-2 pl-8">
                          <input
                            type="checkbox"
                            checked={isActivitySelected(pkg.id, activity.id)}
                            onChange={() =>
                              toggleSelectActivity(pkg.id, activity.id)
                            }
                            className="mr-2"
                          />
                          {activity.name}
                        </td>
                        <td className=" p-2 ">${activity.rate}</td>
                        <td className=" p-2 ">${activity.total}</td>
                        <td className=" p-2 text-center">
                          <button
                            onClick={() => toggleExpandActivity(activity.id)}
                          >
                            {expandedActivities[activity.id] ? (
                              <ChevronDown size={20} />
                            ) : (
                              <Plus size={20} color="#4FD1C5" />
                            )}
                          </button>
                        </td>
                      </tr>

                      {expandedActivities[activity.id] &&
                        activity.workItems.map((item) => (
                          <tr key={item.id} className="bg-gray-50">
                            <td className=" p-2 pl-16">
                              <input
                                type="checkbox"
                                checked={selectedItems[item.id] || false}
                                onChange={() => toggleSelectItem(item.id)}
                                className="mr-2"
                              />
                              {item.name}
                            </td>
                            <td className=" p-2 ">${item.rate}</td>
                            <td className=" p-2 ">${item.total}</td>
                            <td className=" p-2"></td>
                          </tr>
                        ))}
                    </React.Fragment>
                  ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      ) : (
        <div>Hello World!</div>
      )}
    </div>
  );
};

export default WorkOrderCreation;
