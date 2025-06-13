"use client";
import { useContext, useEffect, useState } from "react";
import Hero from "@/components/Hero";
import { AuthContext } from "@/context/auth/authContext";
import AgencyLayout from "@/module/agency/layout/main";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

// Helper function to calculate distance between two coordinates (Haversine formula)
const calculateDistance = (lat1, lng1, lat2, lng2) => {
  const R = 6371; // Radius of Earth in kilometers
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers
  return distance;
};

const Index = () => {
  const [filter, setFilter] = useState(null);
  const [activeLocation, setActiveLocation] = useState(null);
  const [activeBranchType, setActiveBranchType] = useState(null);
  const [branches, setBranches] = useState([]);
  const [filteredBranches, setFilteredBranches] = useState([]);
  const [loader, setLoader] = useState(false);

  const {
    authFunc: { POST },
  } = useContext(AuthContext);

  useEffect(() => {
    // Fetch the list of branches whenever filter or activeLocation changes
    getList();
  }, [filter, activeLocation, activeBranchType]);

  // Fetch branches based on the selected filters
  const getList = () => {
    setLoader(true);
    // Mock API data for branches
    setTimeout(() => {
      const allBranches = [
        {
          id: 1,
          name: "Led 1",
          location: "Ulaanbaatar",
          type: "Main",
          phone: "+976 1234 5678",
          locationDescription:
            "Located in the center of Ulaanbaatar, near the main square.",
          image:
            "https://techzone.mn/wp-content/uploads/2020/12/Flexible-led-1.png",
          coordinates: { lat: 47.920873, lng: 106.917881 },
        },
        {
          id: 2,
          name: "Led 2",
          location: "Erdenet",
          type: "Sub",
          phone: "+976 2345 6789",
          locationDescription: "In the industrial area of Erdenet.",
          image:
            "https://internationalsecurityjournal.com/wp-content/uploads/2022/09/Dahua-Technology-Stand-at-GITEX-scaled-e1664536715572-1536x983.jpg",
          coordinates: { lat: 47.9100793, lng: 106.9258428 },
        },
        {
          id: 3,
          name: "Led 3",
          location: "Erdenet",
          type: "Sub",
          phone: "+976 2345 6789",
          locationDescription: "In the industrial area of Erdenet.",
          image:
            "https://internationalsecurityjournal.com/wp-content/uploads/2022/09/Dahua-Technology-Stand-at-GITEX-scaled-e1664536715572-1536x983.jpg",
          coordinates: { lat: 47.912826345776494, lng:  106.9339966866331},
        },
        {
          id: 4,
          name: "Led 4",
          location: "Erdenet",
          type: "Sub",
          phone: "+976 2345 6789",
          locationDescription: "In the industrial area of Erdenet.",
          image:
            "https://internationalsecurityjournal.com/wp-content/uploads/2022/09/Dahua-Technology-Stand-at-GITEX-scaled-e1664536715572-1536x983.jpg",
          coordinates: { lat: 47.92045195142958, lng: 106.90937313164487,},
        },
        {
          id: 5,
          name: "Led 5",
          location: "Erdenet",
          type: "Sub",
          phone: "+976 2345 6789",
          locationDescription: "In the industrial area of Erdenet.",
          image:
            "https://internationalsecurityjournal.com/wp-content/uploads/2022/09/Dahua-Technology-Stand-at-GITEX-scaled-e1664536715572-1536x983.jpg",
          coordinates: { lat: 47.923958565703835, lng:106.93409297114533 },
        },
        // Add more mock branches here...
      ];
      setBranches(allBranches);
      setFilteredBranches(allBranches); // Initially show all branches
      setLoader(false);
    }, 2000);
  };

  // Filter branches when activeBranchType or activeLocation changes
  useEffect(() => {
    let filtered = branches;

    if (activeBranchType) {
      filtered = filtered.filter((branch) => branch.type === activeBranchType);
    }

    if (activeLocation) {
      filtered = filtered.filter(
        (branch) => branch.location === activeLocation
      );
    }

    setFilteredBranches(filtered);
  }, [activeBranchType, activeLocation, branches]);

  // Handle location and branch type changes
  const handleLocationChange = (e) => {
    setActiveLocation(e.target.value);
  };

  const handleBranchTypeChange = (e) => {
    setActiveBranchType(e.target.value);
  };

  // Google Map
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleMarkerClick = (location) => {
    setSelectedLocation(location);
  };

  const handleCloseInfoWindow = () => {
    setSelectedLocation(null);
  };

  const center = {
    lat: 47.918873,
    lng: 106.917881,
  };

  const mapContainerStyle = {
    width: "100%",
    height: "400px",
  };

  // Get user's current location
  const [userLocation, setUserLocation] = useState(null);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting user location", error);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  // Find the nearest branch
  const findNearestBranch = () => {
    if (!userLocation) return;

    let nearestBranch = null;
    let minDistance = Infinity;

    filteredBranches.forEach((branch) => {
      const distance = calculateDistance(
        userLocation.lat,
        userLocation.lng,
        branch.coordinates.lat,
        branch.coordinates.lng
      );

      if (distance < minDistance) {
        minDistance = distance;
        nearestBranch = branch;
      }
    });

    return nearestBranch;
  };

  // Handle "Near Me" button click
  const handleNearMeClick = () => {
    const nearestBranch = findNearestBranch();
    if (nearestBranch) {
      setSelectedLocation(nearestBranch);
    }
  };
  const handleBranchItemClick = (branch) => {
    setSelectedLocation(branch);  // Set selected branch as the active location
  };

  return (
    <>
      <div className="relative">
        <Hero imageUrl={"/assets/photo/blogs.png"} />
        <div className="absolute top-[40%] left-[20%]">
          <p className="text-[12px] font-[500] leading-[18px] text-[#8557F4] mb-[12px]">
            LEDS
          </p>
          <p className="text-[36px] font-[500] leading-[40px] tracking-[-1.44px] text-[#050514] mb-[24px]">
            Hottest{" "}
            <span className="text-[36px] font-[700] leading-[40px] tracking-[-1.44px] text-[#050514]">
              LEDS
            </span>
          </p>
          <p className="text-[16px] font-[400] leading-[28px] text-[#475467]">
            Хамгийн сүүлийн үеийн салбарын мэдээ, ярилцлага, технологи, нөөц.
          </p>
        </div>
      </div>

      <AgencyLayout>
        {/* Filters Section */}
        <div className="flex gap-8 w-full mb-8">
          <div className="flex-1">
            <div className="flex gap-4 filterLiftboard">
              {/* Location Filter */}
              <div className="filter-dropdown">
                <label className="text-sm font-semibold">Хаяг</label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={activeLocation || ""}
                  onChange={handleLocationChange}>
                  <option value="">Байршил</option>
                  <option value="Ulaanbaatar">Ulaanbaatar</option>
                  <option value="Erdenet">Erdenet</option>
                  <option value="Darkhan">Darkhan</option>
                </select>
              </div>

              {/* Led Type Filter */}
              <div className="filter-dropdown">
                <label className="text-sm font-semibold">Салбарын төрөл</label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={activeBranchType || ""}
                  onChange={handleBranchTypeChange}>
                  <option value="">Бүгд</option>
                  <option value="Main">Main</option>
                  <option value="Sub">Neon</option>
                </select>
                {/* "Near Me" Button */}
              </div>
              <button
                className="bg-blue-500 text-white p-2 rounded-md"
                onClick={handleNearMeClick}>
                Надад ойр
              </button>
            </div>
          </div>
        </div>

        {/* Led Information & Google Map */}
        <div className="flex gap-8 w-full mb-8">
          {/* Left Column (Led Info) */}
          <div className="flex-1 w-full h-[800px] overflow-y-auto">
            <div className="modalLeft">
              <div className="content">
                <div className="reclamTime liftboard">
                  <span className="reclamTitle">Led screen Information</span>
                  {/* Display branch info */}
                  <div className="branchList">
                    {filteredBranches.map((branch) => (
                      <div
                        key={branch.id}
                        className="branchItem mb-4 p-4 border rounded-lg shadow-lg"
                        onClick={() => handleBranchItemClick(branch)} // Add this line
                      >
                        <h3 className="text-lg font-semibold">{branch.name}</h3>
                        <p>
                          <strong>Location:</strong> {branch.location}
                        </p>
                        <p>
                          <strong>Type:</strong> {branch.type}
                        </p>
                        <p>
                          <strong>Phone:</strong> {branch.phone}
                        </p>
                        <p>
                          <strong>Description:</strong>{" "}
                          {branch.locationDescription}
                        </p>

                        {/* Image of Led */}
                        {branch.image && (
                          <div className="mt-4">
                            <img
                              src={branch.image}
                              alt={branch.name}
                              className="w-full h-auto rounded-lg shadow-md"
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (Google Map) */}
          <div className="flex-1 w-full">
            <div className="reclamTime googlemap liftboard">
              <span className="reclamTitle">LED дэлгэцүүдийн байршил</span>
              <LoadScript googleMapsApiKey="AIzaSyC_3ggBdEtjomUHiERqGsNQHeCvntOYHwk">
                <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  center={center}
                  zoom={15}>
                  {filteredBranches?.map((location) => (
                    <Marker
                      key={location?.id}
                      position={location.coordinates}
                      title={location.name}
                      onClick={() => handleMarkerClick(location)}
                    />
                  ))}
                  {selectedLocation && (
                    <InfoWindow
                      position={selectedLocation.coordinates}
                      onCloseClick={handleCloseInfoWindow}>
                      <div className="location-container">
                        <h4>{selectedLocation.name}</h4>
                        <p>{selectedLocation.locationDescription}</p>
                      </div>
                    </InfoWindow>
                  )}
                </GoogleMap>
              </LoadScript>
            </div>
          </div>
        </div>
      </AgencyLayout>
    </>
  );
};

export default Index;
