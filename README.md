# Santa's Logistics Tracker

## Overview
Santa's Logistics Tracker is a modern web application dashboard that allows users to simulate gift delivery, place orders, track real-time order delivery, and register/login with integrated authentication security for seamless user experience. This web app features an intuitive UI with visuals like charts and graphs to monitor orders. 

### Key Highlights
- **Fortune Wheel for Gifts**: Fun and interactive gift rewards.
- **Real-Time Tracker**: Monitor deliveries in real time.
- **Google Maps Integration**: Embed maps seamlessly using Angular's Google Maps library.
- **Toastr Notifications**: Provide elegant user feedback.
- **Multi-Language Support**: Translation functionality with `@ngx-translate/core`.

The backend Spring Boot application leverages MongoDB for data persistence and provides RESTful APIs for logistics, route optimization, and gift tracking.

### Future Enhancements
- Cloud and web server deployment.
- Additional features in progress.

---

## USP Features
- Real-time delivery tracking.
- Gift reward mechanisms.
- Integration of maps, notifications, and translation services for an enhanced user experience.

---

## Prerequisites

### Frontend
#### Required Tools
- **Node.js**: `>= 16.0.0 <19.0.0` (Tested with Node.js v16.20.0)
- **npm**: `>= 8.0.0` (Comes with Node.js)
- **Angular CLI**: `18.0.3` (Install using: `npm install -g @angular/cli`)
- **Google APIs**: Requires API keys for:
  - Directions API
  - Geocoding API
  - Maps JavaScript API

#### Required Versions
- **Angular**: v18.2.13
- **RxJS**: ~7.5.0
- **Zone.js**: ~0.14.7

See the full list of dependencies in the `package.json` file.

### Backend
#### Required Tools
- **Java**: Version 17 (as specified in the Maven `pom.xml` file)
- **Maven**: Version 3.8 or higher
- **MongoDB**: Running instance of MongoDB (default port: `27017`)

#### IDE
You can use any Java IDE, but **IntelliJ IDEA** or **Eclipse** is recommended for Spring Boot projects.

---
note:- kindly create your own api for google maps
## Installation

### Frontend Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/santa-delhivery.git
   cd santa-logistics

2. for Angular file (Frontend)
    1. npm install
    2. for start --- ng serve

3. SpringBoot
    1. open  main method file then run it using
    --- run button
