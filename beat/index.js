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
