import Link from 'next/link'

import 'stylus/landing.styl'

const Index = () => {
    return(
        <main id="landing">
            <a href="https://azurlane.koumakan.jp/San_Diego" target="_blank" rel="noopener noreferrer">
                <img id="san-diego" src="/static/mock/San_Diego.png" alt="San Diego from Azur Lane!" title="San Diego from Azur Lane!" />
            </a>
            <h1 id="title">Underconstruction</h1>
            <h6 id="sub-title">We are currently working hard for this project.</h6>
            <Link href={`/story/[story]`} as={`/story/เริ่มต้นเขียน%20Firestore%20จาก%200%20ด้วย%20JavaScript%20กันเถอะ!`}>
                <a id="detail">
                    Thanks for your attention!
                </a>
            </Link>
        </main>
    )
}

export default Index