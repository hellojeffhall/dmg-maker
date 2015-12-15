## dmg-maker 

### About
A command-line application for creating a .dmg from a specificied folder. 
It is basically a wrapper for hdiutil on Mac, but was an interesting exercise in learning about transforming streams and working with Electron (atom-shell). GUI still in progress.

### Future Features
* Implement the other features of hdiutil rather than simple dmg making.
* Make dmg-making schedulable, where .dmg files have incrementing names.
* Delete the latest dmg in a folder after a certain amount of time.
* Upload dmg to ftp when complete.
