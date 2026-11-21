import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { articleUrl, fiestaUrl, getCopy } from './centralCopy';

export default function CentralVisit({ lang, embedded = false }) {
    const copy = getCopy(lang);
    const Wrapper = embedded ? 'section' : 'main';
    const Heading = embedded ? 'h2' : 'h1';
    return (
        <Wrapper className={'central-visit' + (embedded ? '' : ' central-visit--page')}>
            <div className="central-shell central-visit__grid">
                <div>
                    <p className="central-kicker">{copy.location}</p>
                    <Heading>{copy.venue}</Heading>
                    <p className="central-visit__wheel">{copy.wheel}</p>
                    <p>{copy.address}<br />{copy.directions}</p>
                    <a className="central-text-link" href={fiestaUrl}>{copy.event} <ArrowUpRight size={17} /></a>
                </div>
                <div className="central-visit__hours">
                    <h2>{copy.hours}</h2>
                    <p>{copy.dates} · {copy.localTime}</p>
                    <dl>
                        <div><dt>{copy.friday}</dt><dd>12:00–17:30</dd></div>
                        <div><dt>{copy.saturday}</dt><dd>11:00–17:30</dd></div>
                    </dl>
                    <p className="central-admission">{copy.admission}</p>
                    <a className="central-text-link" href={articleUrl}>{copy.read} <ArrowUpRight size={17} /></a>
                </div>
            </div>
        </Wrapper>
    );
}
