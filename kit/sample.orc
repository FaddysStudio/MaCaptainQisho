instr 13

iInstance chnget "instance"
chnset iInstance + 1, "instance"
p1 += iInstance / 1000

iAmplitude init p4
print iAmplitude

SName strget p5
SSample sprintf "kit/%s.wav", SName
aSample [] diskin2 SSample

p3 filelen SSample

out aSample * iAmplitude

endin
