# react-native-keychain-test-059

This example demonstrates an issue with react-native-keychain 3.1.1, together with react-native 0.59.4. When run on a Google Pixel 3, it can not decrypt when the data in the password field is to long, when using getGenericPassword from react-native-keychain.

Steps to reproduce:
1. Run application on Google Pixel 3 with Android 9.
2. Click on reset to populate fields with test data. (Random username, and random password with length of 4000 characters.)
3. Click on save, and test data is encrypted.
4. Click on load, and the test data cannot be decrypted.

(Also tested on Google Pixel 1, where the test data can be decrypted.)

Why saving this much data in the password field? The data saved is json, containing accessToken and refreshToken, together with expiration data. Depending on which service providing the token, the length will wary, and some tokens can be more than 2000 characters.
