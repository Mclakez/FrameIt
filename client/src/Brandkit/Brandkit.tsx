import { useEffect, useState } from "react";
import Header from "../Header";
import BrandCard from "./BrandCard";
import fetchWithClient from "../lib/fetchClient";
import AddBrandModal from "./AddBrandModal";


type Card = {
  _id: string;
  brandName: string;
  logoUrl: string;
};

export default function BrandKit({userName}: { userName: string | null}) {
    const [cards, setCards] = useState<Card[]>([]);
    const [showModal, setShowModal] = useState(false);
    
     const getCards = async () => {
      
      try {
        const response = await fetchWithClient('/api/brandkits')
        const data = await response.json()
        setCards(data.brandKits)
      } catch (error) {
        console.log('Error:', error);
      }
    }
   

    const deleteCard = async (id: string) => { 
      try{
        const response = await fetchWithClient(`/api/brandkits/${id}`, {
          method: 'DELETE'
        })

        const data = await response.json()
        console.log(data);
        await getCards();
      } catch (error) {
        console.log('Error:', error);
      }
    }

    useEffect( () => {
        getCards();
    }, []);

    return (
       <>
        <Header userName={userName} />
        <div className="text-black min-h-screen bg-(--bg-black) p-8 md:px-16">
            <div className="mb-12">
              <h1 className="text-2xl font-bold text-(--frameit-purple)">Brandkit</h1>
              <p className="text-white">This is the brandkit page. You can add your brand assets here.</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {cards.map(card => (
        <BrandCard key={card._id} name={card.brandName} logoUrl={card.logoUrl} onCancel={() => deleteCard(card._id)} />
      ))}

      {/* Always visible */}
      <button
        onClick={() => setShowModal(true)}
        className="h-40 rounded-lg bg-(--light-black) border border-white/10  shadow-[0_24px_60px_rgba(0,0,0,0.25)] hover:border-(--frameit-purple) flex flex-col items-center justify-center "
      >
        <span className="text-4xl text-(--frameit-purple)">+</span>
        <span className="text-white">Add asset</span>
      </button>
    </div>

    {showModal && (
      <AddBrandModal 
      onClose={() => setShowModal(false)}
      onSuccess={() => {setShowModal(false); getCards()}}/>
    )}
        </div>

        

    
       </>


    )
}