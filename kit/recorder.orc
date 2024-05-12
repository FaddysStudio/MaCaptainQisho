instr record

SPath chnget "path"
iNote chnget "note"
chnset iNote + 1, "note"
SNote mton iNote
SRecording sprintf "%s/%s.wav", SPath, SNote

aChannel1 inch 1
aChannel2 inch 2

fout SRecording, -1, aChannel1, aChannel2

endin
