import cx from 'classnames'
import Link from 'next/link';

interface MenuProps {
    title: string,
    margin?: string,
    active?: boolean,
    href: string
}
export default function Menu(props: Partial<MenuProps>) {
    const {title, margin, active, href="/"}= props
    const classTitle = cx({
        'nav-link': true,
        active
    });
    return (
        <li className={`nav-item my-auto ${margin}`}>
            <Link href={href}>
                <a className={classTitle} aria-current="page">{title}</a>
            </Link>
        </li>
    )
}
