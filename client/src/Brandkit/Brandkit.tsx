import { useEffect, useState } from "react";
import Header from "../Header";
import BrandCard from "./BrandCard";

type FormData = {
  brandname: string;
  logo: File | null;
};

export default function BrandKit() {



    const [cards, setCards] = useState<Card[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        brandname: '',
        logo: null,
    });

    

    const handleAddCard = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Brand kit data:', formData);
        const brandName = formData.brandname
        const logo = formData.logo

        const formDataObj = new FormData();
        formDataObj.append('brandName', brandName);
        if (formData.logo) {
          formDataObj.append('logo', logo);
        }

        const token = localStorage.getItem('token')

        try {
          const response = await fetch('http://localhost:3000/api/brandkits', {
                method: 'POST',
                headers: {'Authorization': `Bearer ${token}` },
                body: formDataObj
            })

        if (!response.ok) {
            const errorData = await response.json();
                console.log(errorData.message)
                return
        }
        const data = await response.json()
        console.log(data);
        await getCards()
        } catch (error) {
          console.log('Error:', error);
        }
        
    }

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.files && e.target.files.length > 0) {
        const file = e.target.files[0];
        setFormData(prev => ({
            ...prev,
            logo: file
        }));
    }
    
  }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

     const getCards = async () => {
      const token = localStorage.getItem('token')
      try {
        const response = await fetch('http://localhost:3000/api/brandkits',{
          headers: {'Authorization': `Bearer ${token}` }
        })
        const data = await response.json()
        setCards(data.brandKits)
      } catch (error) {
        console.log('Error:', error);
      }
    }
   

    const deleteCard = async (id: string) => {
      const token = localStorage.getItem('token')
      try{
        const response = await fetch(`http://localhost:3000/api/brandkits/${id}`, {
          method: 'DELETE',
          headers: {'Authorization': `Bearer ${token}` }
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
        <Header/>
        <div className="text-black min-h-screen bg-(--bg-black) p-8 px-16">
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
        className="h-30 rounded-lg border-2 border-dashed border-(--frameit-purple) flex flex-col items-center justify-center "
      >
        <span className="text-6xl text-(--frameit-purple)">+</span>
        <span className="text-white">Add asset</span>
      </button>
    </div>

    {showModal && (
      <div className="fixed px-12 pt-4 pb-16 w-1/2 top-1/2  left-1/2 -translate-x-1/2 -translate-y-1/2 bg-(--light-black) text-white rounded">
            <div className="flex justify-end">
              <button
              type="button"
              onClick={() => setShowModal(false)}
              className="h-9 w-9"
              aria-label={`Remove ${name}`}
            >
              ✕
            </button>
            </div>

           <form onSubmit={handleAddCard} className="flex flex-col gap-4.5">
            <label>
              <div className="border border-dashed border-(--frameit-purple) rounded h-28 grid place-items-center w-fit px-4 mb-8" id="uploadZone">
                <input type="file" id="photoInput" accept="image/*" name="logo" className="hidden" onChange={onFileChange}/>
                <strong>Click or drag brand kit here</strong>
           </div>
            </label>
            
            {/* name Field */}
            <div className="flex flex-col gap-4">
              <label className="font-normal text-[20px] text-white">
                Name
              </label>
              <input
                type="text"
                name="brandname"
                value={formData.brandname}
                onChange={handleChange}
                required
                className="bg-[#403d3d] h-18 rounded px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-(--frameit-purple)"
                placeholder="Enter asset name"
              />
            </div>

            {/* Done button */}
            <button
              type="submit"
              className="bg-(--frameit-purple) h-18 rounded-lg font-medium text-[20px] text-white hover:opacity-90 transition-opacity mt-2"
            >
              Done
            </button>
          </form>


      </div>
    )}
        </div>

        

    
       </>


    )
}