# cockpit-temperature-plugin

Forked from https://github.com/gigawatts/cockpit-temperature-plugin to add NVMe drive temperatures.

__Note:__ this is customised for my own drive layout / setup. CPU temps are disabled as Fedora 34
currently does not have the revised AMD Epyc temperature monitoring profiles (at least right now
on kernel 5.13.5-200.fc34.x86_64) so lm_sensors does not report core temps.

Cockpit Temperature Plugin using [smoothie-charts](http://smoothiecharts.org)

To install, as described in [Cockpit docs](https://cockpit-project.org/blog/creating-plugins-for-the-cockpit-user-interface.html) simply put
the files in ```/usr/share/cockpit``` for the plugin to be available for all system useres **or** in a spesific user folder
under ```~/.local/share/cockpit```
