import matplotlib.pyplot as plt
import numpy as np
import random
import statistics

# goals:
# 1. left-skewed graphs, so you don't keep drawing for too much
# 2. storm probability should be about 9.7% (3/31),
#   and sun beats down probability should be about 12.9% (4/31)

linprob = 1  # everything in percents
expprob = 0.1
totalcount = 0
currcount = 1
counts = []
numtrials = 1000000
for i in range(numtrials):
    if (random.random() < (linprob+expprob)/100):
        counts.append(currcount)
        currcount = 1
        linprob = 1
        expprob = 0.1
        totalcount += 1
    else:
        # for storm: (gives ~9.75% total prob)
        #linprob += 0.5
        #expprob *= 1.65
        # for sun: (gives ~12.7% total prob)
        linprob += 1
        expprob *= 2.05

        currcount += 1

print("Total prob: " + str(totalcount / numtrials))
print("Median # of draws: " + str(statistics.median(counts)))
plt.hist(counts, bins=100)
plt.title("Frequency of # of draws until fail")
plt.show()

# these are some BEAUTIFUL graphs
