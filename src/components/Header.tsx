type HeaderProps = {
  promoImg?: string
  onClick?: () => void
}

export const Header = ({promoImg, onClick} : HeaderProps) => {
  return(
    <div className={"w-full h-[150px] bg-headerColor"}>
      {promoImg && <img onClick={() => onClick && onClick()} src={promoImg}
                  alt="promo image" className={"w-full h-full object-cover"} />}
    </div>
  )
}
