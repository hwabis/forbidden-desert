import matplotlib.pyplot as plt
import numpy as np
import random
import statistics

# goal:
# storm probability should be about 9.7% (3/31),
# and sun beats down probability should be about 12.9% (4/31)

prob = 1  # in percent
totalcount = 0
currcount = 1
counts = []
numtrials = 1000000
for i in range(numtrials):
    if (random.random() < (prob)/100):
        counts.append(currcount)
        currcount = 1
        prob = 1
        totalcount += 1
    else:
        # for storm: (gives ~8.2% total prob)
        prob += 1
        # for sun: (gives ~11.1% total prob)
        #prob += 2
        currcount += 1

print("Total prob: " + str(totalcount / numtrials))
print("Median # of draws: " + str(statistics.median(counts)))
plt.hist(counts, bins=100)
plt.title("Frequency of # of draws until fail")
plt.show()

# nvm beautiful graphs doesn't mean beautiful game lol