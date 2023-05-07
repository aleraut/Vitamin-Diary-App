# Vitamin-Diary-App

## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)
* [Usage](#usage)

## General info
This project is made as a school project for the course Mobile Programming. The project is a vitamin diary app.

## Technologies
The project is created with React Native as an expo app.

As a database I used SQLite, since the data in the app is only for the user and needs to be saved only to the users device.

The components I used were:

* Many components from react-native like Flatlist and Alert
* react-navigation for using to components as stacked screens
* Header from react native elements for the header bar with a calendar button to the Calendar component
* Many components like Button, Checkbox and Icon from react native elements were used in the project

## Setup
Go to https://expo.dev/@aleraut/vitamindiary?serviceType=classic&distribution=expo-go and scan the QR-code with your expo-app

## Usage
The user can add the products they are taking by writing the vitamin and the amount taken, check them as taken, and log the completed day as done to the Calendar page.