import React from 'react'

import svgWhites from '../assets/white.svg'
import svgColored from '../assets/colored.svg'
import svgDelicates from '../assets/delicates.svg'
import svgDenim from '../assets/denim.svg'
import svgAthleticWear from '../assets/athletic gear.svg'
import svgOutwear from '../assets/outerwear.svg'
import svgBedLinens from '../assets/bedding.svg'
import svgTowels from '../assets/towel.svg'


const Icon = ({svgName}) => {
  return (
    <img src={svgName} alt='Whites' style={{ width: '150px', height: '150px', borderRadius: '1rem', padding: '.5rem' }}/>
  )
}


const ClothesType = [
  {
    clothType: "Whites",
    icon: <Icon svgName={svgWhites}/>
  },
  {
    clothType: "Colored",
    icon: <Icon svgName={svgColored}/>
  },
  {
    clothType: "Delicates",
    icon: <Icon svgName={svgDelicates}/>
  },
  {
    clothType: "Denim",
    icon: <Icon svgName={svgDenim}/>
  },
  {
    clothType: "Athletic Wear",
    icon: <Icon svgName={svgAthleticWear}/>
  },
  {
    clothType: "Outwear",
    icon: <Icon svgName={svgOutwear}/>
  },
  {
    clothType: "Bed Linens",
    icon: <Icon svgName={svgBedLinens}/>
  },
  {
    clothType: "Towels",
    icon: <Icon svgName={svgTowels}/>
  }
]

const POS = () => {

  return (
    <div className="w-full h-full flex flex-row px-8 p-3 bg-brightYellow rounded-b-3xl gap-3">
      <div className="bg-screenYellow rounded-3xl w-4/6 p-4 pl-5">
        <div className="flex flex-row justify-between p-4">
          <div className="rounded-2xl w-1/5 h-full bg-lightBlue hover:bg-brightYellow select-none flex flex-col items-center">
            <div className="pt-1"></div>
            {ClothesType[0].icon}
            <p className='text-lg font-semibold text-center pt-0 pb-2'>{ClothesType[0].clothType}</p>
          </div>

          <div className="rounded-2xl w-1/5 h-fit bg-lightBlue hover:bg-brightYellow select-none flex flex-col items-center">
            <div className="pt-1"></div>
            {ClothesType[1].icon}
            <p className='text-lg font-semibold text-center pt-0 pb-2'>{ClothesType[1].clothType}</p>
          </div>
          <div className="rounded-2xl w-1/5 h-fit bg-lightBlue hover:bg-brightYellow select-none flex flex-col items-center">
            <div className="pt-1"></div>
            {ClothesType[2].icon}
            <p className='text-lg font-semibold text-center pt-0 pb-2'>{ClothesType[2].clothType}</p>
          </div>
          <div className="rounded-2xl w-1/5 h-fit bg-lightBlue hover:bg-brightYellow select-none flex flex-col items-center">
            <div className="pt-1"></div>
            {ClothesType[3].icon}
            <p className='text-lg font-semibold text-center pt-0 pb-2'>{ClothesType[3].clothType}</p>
          </div>
        </div>
        <div className="flex flex-row justify-between p-4">
          <div className="rounded-2xl w-1/5 h-full bg-lightBlue hover:bg-brightYellow select-none flex flex-col items-center">
            <div className="pt-1"></div>
            {ClothesType[4].icon}
            <p className='text-lg font-semibold text-center pt-0 pb-2'>{ClothesType[4].clothType}</p>
          </div>
          <div className="rounded-2xl w-1/5 h-full bg-lightBlue hover:bg-brightYellow select-none flex flex-col items-center">
            <div className="pt-1"></div>
            {ClothesType[5].icon}
            <p className='text-lg font-semibold text-center pt-0 pb-2'>{ClothesType[5].clothType}</p>
          </div>
          <div className="rounded-2xl w-1/5 h-full bg-lightBlue hover:bg-brightYellow select-none flex flex-col items-center">
            <div className="pt-1"></div>
            {ClothesType[6].icon}
            <p className='text-lg font-semibold text-center pt-0 pb-2'>{ClothesType[6].clothType}</p>
          </div>
          <div className="rounded-2xl w-1/5 h-full bg-lightBlue hover:bg-brightYellow select-none flex flex-col items-center">
            <div className="pt-1"></div>
            {ClothesType[7].icon}
            <p className='text-lg font-semibold text-center pt-0 pb-2'>{ClothesType[7].clothType}</p>
          </div>
        </div>
      </div>
      <div className="bg-lightBlue rounded-3xl w-2/6 p-4 pl-5">
        <p>ho</p>
      </div>
    </div>
  )
}

export default POS