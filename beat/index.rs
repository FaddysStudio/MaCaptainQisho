$ rm -rf .FaddysBeat ; mkdir -p .FaddysBeat ; ln -s ~/studio/kit/percussive/*.wav .FaddysBeat

$ cat - > .FaddysBeat/index.js

import Scenarist from '@faddys/scenarist';

await Scenarist ( new class Beat {

instrument = 13
tempo = 110
length = 4
measure = 8
sequence = []

async $_producer ( $ ) {

await $ ( ... process .argv .slice ( 2 ) );

const beat = this;

console .log ( `

t 0 ${ beat .tempo }
v ${ beat .length }

${ beat .sequence .join ( '\n' ) }

s ${ beat .length }

` .trim () );

}

async $_director ( $, ... argv ) {

if ( ! argv .length )
return '';

const beat = this;
const [ step, sample ] = argv .shift () .split ( '/' );

beat .sequence .push ( `i ${ beat .instrument }.${ beat .sequence .length } [${ step }/${ beat .measure }] 1 ".FaddysBeat/${ sample }.wav"` );

await $ ( ... argv );

}

} );

$ node .FaddysBeat 0/dom 1/tak 3/tak 4/dom 6/tak > .FaddysBeat/maqsum.sco

$ cat - > .FaddysBeat/maqsum.orc

sr = 96000
ksmps = 96
nchnls = 2
0dbfs = 1

instr 13

SSample strget p4
aSample [] diskin2 SSample

out aSample

endin

$ csound -o maqsum.wav -3 .FaddysBeat/maqsum.*

$ aplay maqsum.wav

$ rm -rf .FaddysBeat
