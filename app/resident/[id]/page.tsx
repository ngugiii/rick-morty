"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { FaArrowLeft } from "react-icons/fa6";
import { addNote, getNote } from '../../utils/db';

interface Episode {
  id: number;
  name: string;
  episode: string;
}

interface Resident {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  origin: {
    name: string;
  };
  location: {
    name: string;
  };
  image: string;
  episode: string[];
}

const ResidentDetailsPage: React.FC = () => {
  const params = useParams();
  const { id } = params;
  const [resident, setResident] = useState<Resident | null>(null);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);
  const [note, setNote] = useState<string>('');

  useEffect(() => {
    const fetchResidentDetails = async () => {
      try {
        const { data } = await axios.get<Resident>(`https://rickandmortyapi.com/api/character/${id}`);
        setResident(data);

        // Fetch episodes after resident details are fetched and set
        fetchEpisodes(data.episode);
      } catch (error) {
        console.error('Error fetching resident details:', error);
      }
    };

    const fetchEpisodes = async (episodeUrls: string[]) => {
      try {
        const episodeRequests = episodeUrls.map(episodeUrl => axios.get<Episode>(episodeUrl));
        const episodesData = await Promise.all(episodeRequests);
        setEpisodes(episodesData.map(res => res.data));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching episodes:', error);
      }
    };

    if (id) {
      fetchResidentDetails();
    }
  }, [id]);

  useEffect(() => {
    const fetchAndSetNote = async () => {
        const savedNote = await getNote(Number(id));
        if (savedNote) {
          setNote(savedNote);
        }
      };

    fetchAndSetNote();
  }, [id]);

  const handleAddNote = async () => {
    if (!note.trim()) return;
    await addNote(note.trim());
    alert('Note added successfully!');
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!resident) {
    return <p>Resident not found.</p>;
  }

  return (
    <div className="bg-gray-800 min-h-screen mx-auto p-8">
      <Link href={`/`} className='text-white bg-green-600 px-2 py-1 rounded flex justify-between items-center sm:w-[6%] w-[40%]'><FaArrowLeft size={20} color='white'/> Back</Link>
      <h2 className="text-3xl font-bold mb-4 mt-2 text-white font-serif">{resident.name}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 place-items-center bg-white rounded-lg p-5">
        <div>
          <img src={resident.image} alt={resident.name} className="w-[25rem] h-[25rem] rounded-lg mb-4" />
        </div>
        <div className='w-full'>
          <p className="text-2xl font-bold">Location: <span className='text-[orangered]'>{resident.location.name}</span></p>
          <div className="mt-2">
            <p className="text-lg font-bold">Status: <span className='text-[orangered] font-semibold'>{resident.status}</span></p>
            <p className="text-lg font-bold">Species: <span className='text-[orangered] font-semibold'>{resident.species}</span></p>
            <p className="text-lg font-bold">Gender: <span className='text-[orangered] font-semibold'>{resident.gender}</span></p>
            <p className="text-lg font-bold">Origin: <span className='text-[orangered] font-semibold'>{resident.origin.name}</span></p>
          </div>
          <div className="mt-4">
            <p className="text-2xl font-bold mb-1">Appeared in Episodes:</p>
            <ul>
              {episodes.map((episode, index) => (
                <li key={index} className="mb-2">
                  <p> <span className='text-[orangered] font-semibold'>{episode.name}</span> - {episode.episode}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-4">
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add note..."
              className="w-full px-3 py-2 border rounded-lg resize-none focus:outline-none focus:border-[#FF4500]"
            />
            <button onClick={handleAddNote} className="mt-2 px-4 py-2 bg-[#FF4500] text-white rounded-lg">Add Note</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResidentDetailsPage;
