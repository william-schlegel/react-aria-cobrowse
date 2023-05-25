# demo project for react-aria / cobrowse problem

install project and start it with `yarn dev`

the `cobrowse` scripts are loaded in `index.html`

the mais app implemets `react-aria` component (for date)

if you navigate in the date using keyboard and try do go forward and backward, the browser freezes in an infinite loop in this function (the 3d loop)

```js
previousNode: function() {
  var e, t, o;
  for (e = this.currentNode; e !== this.root; ) {
      for (o = e.previousSibling; null !== o; ) {
          for (t = l(this, e = o); t !== n.FILTER_REJECT && null !== e.lastChild; )
              e = e.lastChild,
              t = l(this, e);
          if (t === n.FILTER_ACCEPT)
              return this.currentNode = e,
              e
      }
      if (e === this.root || null === e.parentNode)
          return null;
      if (e = e.parentNode,
      l(this, e) === n.FILTER_ACCEPT)
          return this.currentNode = e,
          e
  }
  return null
},
```

as we are using `react 17` in our main app, I used the same but the problem is equivalent with `react 18`
