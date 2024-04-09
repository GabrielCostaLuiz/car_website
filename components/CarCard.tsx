"use client";

import { useState } from "react";
import Image from "next/image";

import { calculateCarRent, generateCarImageUrl } from "@utils";
import { CarProps } from "@types";
import CustomButton from "./CustomButton";
import CarDetails from "./CarDetails";

interface CarCardProps {
  car: CarProps;
}

const CarCard = ({ car }: CarCardProps) => {
  const { city_mpg, year, make, model, transmission, drive } = car;

  const [isOpen, setIsOpen] = useState(false);

  const carRent = calculateCarRent(city_mpg, year);

  return (
    <div className="car-card group">
    <div className="car-card__content">
      <h2 className="car-card__content-title">
        {make} {model}
      </h2>
    </div>
  
    <p className='flex mt-6 text-[32px] leading-[38px] font-extrabold'>
      <span className='self-start text-[14px] leading-[17px] font-semibold'>$</span>
      {carRent}
      <span className='self-end text-[14px] leading-[17px] font-medium'>/dia</span>
    </p>
  
    <div className='relative w-full h-40 my-3 object-contain'>
      <Image src={generateCarImageUrl(car)} alt='modelo de carro' fill priority className='object-contain' />
    </div>
  
    <div className='relative flex w-full mt-2'>
      <div className='flex group-hover:invisible w-full justify-between text-grey'>
        <div className='flex flex-col justify-center items-center gap-2'>
          <Image src='/steering-wheel.svg' width={20} height={20} alt='volante' />
          <p className='text-[14px] leading-[17px]'>
            {transmission === "a" ? "Automático" : "Manual"}
          </p>
        </div>
        <div className="car-card__icon">
          <Image src="/tire.svg" width={20} height={20} alt="assento" />
          <p className="car-card__icon-text">{drive.toUpperCase()}</p>
        </div>
        <div className="car-card__icon">
          <Image src="/gas.svg" width={20} height={20} alt="assento" />
          <p className="car-card__icon-text">{city_mpg} MPG</p>
        </div>
      </div>
  
      <div className="car-card__btn-container">
        <CustomButton
          title='Ver Mais'
          containerStyles='w-full py-[16px] rounded-full bg-primary-blue'
          textStyles='text-white text-[14px] leading-[17px] font-bold'
          rightIcon='/right-arrow.svg'
          handleClick={() => setIsOpen(true)}
        />
      </div>
    </div>
  
    <CarDetails isOpen={isOpen} closeModal={() => setIsOpen(false)} car={car} />
  </div>
  
  );
};

export default CarCard;
