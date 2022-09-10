import Link from "next/link";

interface FooterMenuProps {
    title: string
    href: string
}

export default function FooterMenu(props: FooterMenuProps) {
    const {title, href} = props
    return (
        <li className="mb-6">
            <Link href={href}>
            <a className="text-lg color-palette-1 text-decoration-none">{title}</a>
            </Link>
        </li>
    )
}
