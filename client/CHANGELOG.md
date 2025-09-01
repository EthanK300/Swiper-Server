# Changelog

## [1.0] - 9/1/25

### Added
- Add button adds task to UI

### Changed
- Removed "empty" state variable, just using tasks.length to track now

## [1.0] - 8/31/25

### Added
- Rudimentary date & time picker
- Positionally-styled form elements

## [1.0] - 8/28/25

### Added
- Task form working

## [1.0] - 8/25/25

### Added
- Started task form component

### Changed
- Add bar to persist through overlay darken

## [1.0] - 8/22/25

### Added
- Support us button on landing page

### Changed
- Styling on landing page and navbar
- Signup form defaults to register instead of login

### Fixed
- Broken download button now maps to github for now

## [1.0] - 8/19/25

### Added
- Delay button works but the animation is a bit scuffed
- Task handling is all in states

### Changed
- Main css transition scheme for animation

### Fixed
- Clean up print statements in random files

## [1.0] - 8/18/25

### Added
- Complete button is able to delete task from tasks list

### Changed
- Refactored the button call hierarchy a bit

## [1.0] - 8/17/25

### Added
- Main tasklist pretty much done (modify styling/colors to desire), need to get add task form/retrieve from database connection working
- Changed from local storage JWT to cookies

## [1.0] - 8/15/25

### Added
- Main tasklist (needs to be finished)

## [1.0] - 8/14/25

### Added
- Side buttons for complete and delay defaults
- SVG graphics for non-squarish/ellipsish elements?

### Changed
- Made filter font bigger and more readable for selected filter

## [1.0] - 8/13/25

### Added
- Main page add task button
- Esc & Enter controls for the add

### Changed
- Color scheme on the add bar
- Behavior of keypress/mouse on add bar

### Fixed
- Landing page image way too big

## [1.0] - 8/10/25

### Added
- FilterMenu, sends updates back to the main page for other handling

## [1.0] - 8/9/25

### Added
- Attempt to read token to auto-forward to dashboard if signed in
- Filter bar on main page, styling

## [1.0] - 8/8/25

### Changed
- Random signup form fixes

## [1.0] - 8/7/25

### Added
- Dashboard works when navigated to via login

### Changed
- AuthContext to remove non-working navigates
- Instances of Login/Logout AuthContext functions unified in intent

### Fixed
- Code formatting to be more consistent with spacing
- Navbar to correctly scroll to top when home image is clicked

## [1.0] - 8/6/25

### Changed
- Using axios instead of fetch

### Fixed
- More convenient .env variable loading between prod/dev server

## [1.0] - 8/5/25

### Added
- Profile Menu dropdown for when a user is logged in
- Test request for login

### Changed
- Changed AuthContext to reflect usage of JWT tokens

### Fixed
- Styling on the navbar profile & get started button to be center-lined

## [1.0] - 8/4/25

### Added
- Start jwt token integration auth

### Changed
- Navbar to add a get started in addition to profile for responsiveness on user login state

### Fixed
- Styling on the login/register form