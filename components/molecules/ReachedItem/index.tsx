interface ReachedItemProps {
    stat: String
    title: String
}

export default function ReachedItem(props: ReachedItemProps) {
    const {stat, title} = props
  return (
    <>
     <p className="text-4xl text-lg-start text-center color-palette-1 fw-bold m-0">{stat}</p>
    <p className="text-lg text-lg-start text-center color-palette-2 m-0">{title}</p>
    </>
  )
}
