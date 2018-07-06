# kwc-number-inputs

<br/>

***Hey you, do you want the doc for a specific component?***

***Click here and go to [docs](/docs)***

<br/>

## `<kwc-numpad>`

### Usage:
```html
<kwc-numpad></kwc-numpad>
```

or  
  
```html
<kwc-numpad negative="false"></kwc-numpad>
```

### Properties:
- CSS variables:
    - `--kwc-numpad-background`
    - `--kwc-numpad-button-background`
    - `--kwc-numpad-button-background-hover`
    - `--kwc-numpad-button-color`
    - `--kwc-numpad-button-color-hover`
    - `--kwc-numpad-button-width`
    - `--kwc-numpad-button-height`

- HTML attributes:
    - `negative`
        - *optional*
        - default is `true`

<br/>

## `<kwc-slider>`

### Usage:
```html
<kwc-slider></kwc-slider>
```
  
or  
  
```html
<kwc-slider min="0" max="150"></kwc-slider>
```

### Properties:
- CSS variables:
    - `--kwc-numpad-background`
    - `--kwc-numpad-slider-background`
    - `--kwc-numpad-slider-background-hover`
    - `--kwc-numpad-slider-color`
    - `--kwc-numpad-slider-color-hover`
    - `--kwc-numpad-slider-border-color`
    - `--kwc-numpad-slider-border-color-hover`

- HTML attributes:
    - `min`
        - *optional*
        - default is `0`
    - `max`
        - *optional*
        - default is `100`

<br/>

## `<kwc-dial>`

### Usage:
```html
<kwc-dial></kwc-dial>
```
  
or  
  
```html
<kwc-dial prefix="$" suffix="°"></kwc-dial>
```

### Properties:
- CSS variables:
  
    - `--kwc-numpad-background`
    - `--kwc-numpad-dial-background`
    - `--kwc-numpad-dial-background-hover`
    - `--kwc-numpad-dial-text-color`
    - `--kwc-numpad-dial-text-color-hover`
    - `--kwc-numpad-dial-color`
    - `--kwc-numpad-dial-color-hover`
    - `--kwc-numpad-dial-border-color`
    - `--kwc-numpad-dial-border-color-hover`
    - `--kwc-numpad-dial-round-text`
    - `--kwc-numpad-dial-round-text-hover`
    - `--kwc-numpad-dial-center-text`
    - `--kwc-numpad-dial-center-text-hover`

- HTML attributes:
    - `prefix`
        - *optional*
    - `suffix`
        - *optional*

<br/>

## `<kwc-slider-numpad>`

### Usage:
```html
<kwc-slider-numpad></kwc-slider-numpad>
```
  
or  
  
```html
<kwc-slider-numpad min="0" max="150"></kwc-slider-numpad>
```

### Properties:
- CSS variables:
    - `--kwc-numpad-background`
    - `--kwc-numpad-button-background`
    - `--kwc-numpad-button-background-hover`
    - `--kwc-numpad-button-color`
    - `--kwc-numpad-button-color-hover`
    - `--kwc-numpad-button-width`
    - `--kwc-numpad-button-height`
    - `--kwc-numpad-slider-background`
    - `--kwc-numpad-slider-background-hover`
    - `--kwc-numpad-slider-color`
    - `--kwc-numpad-slider-color-hover`
    - `--kwc-numpad-slider-border-color`
    - `--kwc-numpad-slider-border-color-hover`

- HTML attributes:
    - `min`
        - *optional*
        - default is `0`
    - `max`
        - *optional*
        - default is `100`

<br/>

## `<kwc-dial-numpad>`

### Usage:
```html
<kwc-dial-numpad></kwc-dial-numpad>
```
  
or  
  
```html
<kwc-dial-numpad prefix="$" suffix="°"></kwc-dial-numpad>
```

### Properties:
- CSS variables:
    - `--kwc-numpad-background`
    - `--kwc-numpad-button-background`
    - `--kwc-numpad-button-background-hover`
    - `--kwc-numpad-button-color`
    - `--kwc-numpad-button-color-hover`
    - `--kwc-numpad-button-width`
    - `--kwc-numpad-button-height`
    - `--kwc-numpad-dial-background`
    - `--kwc-numpad-dial-background-hover`
    - `--kwc-numpad-dial-text-color`
    - `--kwc-numpad-dial-text-color-hover`
    - `--kwc-numpad-dial-color`
    - `--kwc-numpad-dial-color-hover`
    - `--kwc-numpad-dial-border-color`
    - `--kwc-numpad-dial-border-color-hover`
    - `--kwc-numpad-dial-round-text`
    - `--kwc-numpad-dial-round-text-hover`
    - `--kwc-numpad-dial-center-text`
    - `--kwc-numpad-dial-center-text-hover`

- HTML attributes:
    - `prefix`
        - *optional*
    - `suffix`
        - *optional*

<br/>

## `<kwc-dial-slider>`

### Usage:
```html
<kwc-dial-slider></kwc-dial-slider>
```
  
or  
  
```html
<kwc-dial-slider
    prefix="$"
    suffix="°"
    min="0"
    max="150">
</kwc-dial-slider>
```

### Properties:
- CSS variables:
    - `--kwc-numpad-background`
    - `--kwc-numpad-slider-background`
    - `--kwc-numpad-slider-background-hover`
    - `--kwc-numpad-slider-color`
    - `--kwc-numpad-slider-color-hover`
    - `--kwc-numpad-slider-border-color`
    - `--kwc-numpad-slider-border-color-hover`
    - `--kwc-numpad-dial-background`
    - `--kwc-numpad-dial-background-hover`
    - `--kwc-numpad-dial-text-color`
    - `--kwc-numpad-dial-text-color-hover`
    - `--kwc-numpad-dial-color`
    - `--kwc-numpad-dial-color-hover`
    - `--kwc-numpad-dial-border-color`
    - `--kwc-numpad-dial-border-color-hover`
    - `--kwc-numpad-dial-round-text`
    - `--kwc-numpad-dial-round-text-hover`
    - `--kwc-numpad-dial-center-text`
    - `--kwc-numpad-dial-center-text-hover`

- HTML attributes:
    - `min`
        - *optional*
        - default is `0`
    - `max`
        - *optional*
        - default is `100`
    - `prefix`
        - *optional*
    - `suffix`
        - *optional*
