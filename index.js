import Scenarist from '@faddys/scenarist';
import command from '@faddys/command';
import { parse } from 'node:path';

const $$ = Symbol .for;

try {

await Scenarist ( new class Maestro {

path = parse ( new URL ( import .meta .url ) .pathname ) .dir

async $_producer ( $ ) {

const maestro = this;

maestro .directory = await command ( 'ls', maestro .directory ) .then ( async $ => await $ ( $$ ( 'output' ) ) );;

return await $ ( ... process .argv .slice ( 2 ) );

}

async $_director ( $ ) {

await $ ( $$ ( 'orchestra' ) );
await $ ( $$ ( 'score' ) );

// await command ( 'csound', '-odac', 'index.*' );

}

async $_orchestra ( $ ) {

const maestro = this;
const kit = maestro .kit = ( await maestro .list ( 'kit' ) )
.filter ( instrument => instrument .endsWith ( '.orc' ) )
.map ( instrument => instrument .slice ( 0, instrument .length - 4 ) );
const orchestra = await command ( 'cat', '-', '>', maestro .path + '/index.orc' );

await orchestra ( `#include "${ maestro .path }/header/${ maestro .header }.orc"

${ kit .map ( ( instrument, index ) => `#define ${ instrument } #${ index + 1 }#
#include "${ maestro .path }/kit/${ instrument }.orc"` )
.join ( '\n\n' )

} ` );

await orchestra ( $$ ( 'end' ) );

}

async $_score ( $ ) {

const maestro = this;
const kit = maestro .kit .map ( ( instrument, index ) => `#define ${ instrument } #${ index + 1 }#` ) .join ( '\n' );
const beats = ( await maestro .list ( 'beat' ) )
.filter ( beat => beat .endsWith ( '.sco' ) )
.map ( beat => `#include "${ maestro .path }/beat/${ beat }` ) .join ( '\n' );

if ( ! beats .length )
throw 'Empty beats directory';

const score = await command ( 'cat', '-', '>', maestro .path + '/index.sco' );

await score ( kit + '\n\n' + beats );
await score ( $$ ( 'end' ) );

}

header = 'lossless'


async [ '$--header' ] ( $, value, ... argv ) {

const maestro = this;

const headers = await maestro .list ( 'header' );

if ( headers .includes ( value + '.orc' ) )
maestro .header = value;

else
throw `Invalid header type. Specify one from the following:

${ headers .map ( header => `  ${ header .slice ( 0, header .length - 4 ) }` ) .join ( '\n' ) }`

return await $ ( ... argv );

}

async list ( directory = '.' ) {

return await command ( 'ls', this .path + '/' + directory )
.then ( async $ => await $ ( $$ ( 'output' ) ) );

}

} );

} catch ( error ) {

console .error ( error );

}
