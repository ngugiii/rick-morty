"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

interface Location {
  id: number;
  name: string;
  type: string;
  residents: string[];
}

interface Character {
  id: number;
  name: string;
  status: string;
  image: string;
  url: string;
}

const Page: React.FC = () => {
  const [locationData, setLocationData] = useState<Location[]>([]);
  const [residents, setResidents] = useState<Character[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const getData = async () => {
    try {
      const { data } = await axios.get<{ results: Location[] }>("https://rickandmortyapi.com/api/location");
      setLocationData(data.results);
    } catch (error) {
      console.log(error);
    }
  }

  const getResidentDetails = async (residentUrl: string) => {
    try {
      const { data } = await axios.get<Character>(residentUrl);
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const fetchResidents = async () => {
      const residentsData = await Promise.all(locationData.flatMap(location =>
        location.residents.map(residentUrl => getResidentDetails(residentUrl))
      ));
      setResidents(residentsData.filter((resident): resident is Character => resident !== null));
    }

    if (locationData.length > 0) {
      fetchResidents();
    }
  }, [locationData]);

  // Filter locations and residents based on search query
  const filteredLocations = locationData.filter(location =>
    location.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='bg-gray-800 min-h-screen p-8 text-black'>
      <h1 className='font-serif text-3xl text-center font-bold mb-3 text-white'>Rick & Morty Locations/Characters</h1>
      
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="rounded-lg border-gray-300 border p-2 mb-4"
      />

      <div className="flex flex-wrap">
        {filteredLocations.map((location) => (
          <div className='shadow-lg bg-white mb-3 rounded-lg p-8 flex flex-col' key={location.id}>
            <div className="flex flex-col">
              <span className='text-lg font-bold'>Location Name: <span className='text-[orangered]'>{location.name}</span></span>
              <span className='text-lg font-bold'>Location Type: <span className='text-[orangered]'>{location.type}</span></span>
            </div>
            <div className="grid grid-cols-6 gap-2">
              {residents
                .filter(resident => location.residents.includes(resident.url)) 
                .map((resident) => (
                  <Link href={`/resident/${resident.id}`} key={resident.id}>
                  <ul key={resident.id} className='flex flex-col justify-center rounded-lg items-center border-2 p-3 border-gray-300 m-1'>
                    <li className=''><img className='w-[5rem] h-[5rem] rounded-lg' src={resident.image} alt="" /></li>
                    <li>
                      <div className="flex flex-col mt-1">
                        <span className='font-bold'>Name: <span className='text-[orangered] font-normal'>{resident.name}</span></span>
                        <span className='font-bold'>Status: <span className='text-[orangered] font-normal'>{resident.status}</span></span>
                      </div>
                    </li>
                  </ul>
                  </Link>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Page;
