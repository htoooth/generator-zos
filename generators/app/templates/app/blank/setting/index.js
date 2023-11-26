AppSettingsPage({
  build(props) {
    return Section({}, [
      View(
        {
          style: {
            marginTop: '50px',
            textAlign: 'center',
          },
        },
        [Text({}, ['Hello, '])],
      ),
      View(
        {
          style: {
            marginTop: '50px',
            textAlign: 'center',
          },
        },
        [
          Button({
            label: 'Clear All',
            color: 'default',
            onClick: () => {
              props.settingsStorage.setItem('data:clear', true)
            },
          }),
        ],
      ),
      View(
        {
          style: {
            marginTop: '50px',
            textAlign: 'center',
          },
        },
        [
          Button({
            label: 'Set Data',
            color: 'default',
            onClick: () => {
              props.settingsStorage.setItem('data:name', true)
            },
          }),
        ],
      ),
      View(
        {
          style: {
            marginTop: '50px',
            textAlign: 'center',
          },
        },
        [
          Button({
            label: 'Get Data',
            color: 'default',
            onClick: () => {
              props.settingsStorage.getItem('data:name')
            },
          }),
        ],
      ),
    ])
  },
})
