import Link from 'next/link'

import 'stylus/landing.styl'

const Index = () => {
    return(
        <main id="landing">
            <a href="https://azurlane.koumakan.jp/San_Diego" target="_blank" rel="noopener noreferrer">
                <img id="san-diego" src="/mock/San_Diego.png" alt="San Diego from Azur Lane!" title="San Diego from Azur Lane!" />
            </a>
            <h1 id="title">Underconstruction</h1>
            <h6 id="sub-title">We are currently working hard for this project.</h6>
            <Link href="/story/[story]" as={`/story/เริ่มต้นเขียน-Firestore-จาก-0-ด้วย-JavaScript-กันเถอะ!`}>
                <a id="detail">
                    Thanks for your attention!
                </a>
            </Link>
        </main>
    )
}

export default Index