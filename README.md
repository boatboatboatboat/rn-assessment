# React-Native assessment
Simple React Native demo application that lists posts.

## Build instructions

### Android
#### Windows/macOS/Linux (Release)
```bash
cd android
./gradlew assembleRelease
```
The generated APK can be found in `android/app/build/outputs/apk/release` as `app-release.apk`
#### Windows/macOS/Linux (Debug)
```bash
# In one terminal
npx react-native start
# In another terminal
npx react-native run-android
```
A device or simulator should be connected to run the application.
### iOS
I don't have a Mac to test it on, and my macOS virtual machine is having graphical issues,
so all of this is based on the React documentation.
#### macOS (Release)
```bash
npx react-native run-ios --configuration Release
```
#### macOS (Debug)
```bash
npx react-native run-ios
```
