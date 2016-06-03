# Squids Pro Quo

🐙 💯

#### Usage

Put the following code anywhere in your HTML.

    <script src="https://d2miw5gu5zak37.cloudfront.net/" type="text/javascript"></script>

***

## Better Datetime

![datetime](https://cloud.githubusercontent.com/assets/6847023/15765344/32cd392a-2977-11e6-8d14-48e5b2c6ad56.png)

- Puts the correct headings above the each dropdown in a datetime, and puts the fields next to each other instead of on top of each other
- Adjusts the widths of the labels and boxes to fit 100% of the container, no matter the number of y/m/d/h/i/s fields

#### Notes

- You cannot use textboxes for any fields, they must all be select dropdowns

## Conditional Form Sections

![giphy](https://cloud.githubusercontent.com/assets/6847023/15765398/d30f86a4-2977-11e6-9a50-ae6cad63afb6.gif)

Allows sections of a form to be hidden unless a certain radio button is selected.

#### Instructions

1. Add `#` followed by a number at the start of a section name, the section will be hidden by default
2. Add `?` followed by a section number to the start of the text in the radio button to make selecting the button display this section

#### Notes

- These `#`s and `?`s won't be displayed on the page
- Only use this for 1-page forms
- Don't have a default value on your radio buttons
- Don't have any 'required' fields inside conditional sections
- Date/time fields are 'required' by default, you must select 'allow blank' on all fields for this component

## Layout of 'Field Notes'

![fieldnote](https://cloud.githubusercontent.com/assets/6847023/15765349/3db87796-2977-11e6-865d-3e5107c7561c.png)

Fix the 'Filed Note' (form helper text) weird spacing, and give it a slightly prettier styling.

***

## Notes

Because of the nature of the javascript injection, all CSS must use double quotes (`"`) only. Any use of single quotes (`'`) will break the injection!
