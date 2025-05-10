import { Dialog, DialogProps } from './Dialog'

type Props = {
  dialogs?: DialogProps[]
}

export const DialogList = ({ dialogs }: Props) => {
  return (
    <ul>
      <Dialog
        lastMessage={'Some fucking special ...'}
        time={new Date().toLocaleDateString()}
        userName={'username'}
      />
      <Dialog
        lastMessage={'Some fucking special ...'}
        time={new Date().toLocaleDateString()}
        userName={'username'}
      />
      <Dialog
        lastMessage={'Some fucking special ...'}
        time={new Date().toLocaleDateString()}
        userName={'username'}
      />
      <Dialog
        lastMessage={'Some fucking special ...'}
        time={new Date().toLocaleDateString()}
        userName={'username'}
      />
      <Dialog
        lastMessage={'Some fucking special ...'}
        time={new Date().toLocaleDateString()}
        userName={'username'}
      />
      <Dialog
        lastMessage={'Some fucking special ...'}
        time={new Date().toLocaleDateString()}
        userName={'username'}
      />
      <Dialog
        lastMessage={'Some fucking special ...'}
        time={new Date().toLocaleDateString()}
        userName={'username'}
      />
      <Dialog
        lastMessage={'Some fucking special ...'}
        time={new Date().toLocaleDateString()}
        userName={'username'}
      />
      <Dialog
        lastMessage={'Some fucking special ...'}
        time={new Date().toLocaleDateString()}
        userName={'username'}
      />
      <Dialog
        lastMessage={'Some fucking special ...'}
        time={new Date().toLocaleDateString()}
        userName={'username'}
      />
      <Dialog
        lastMessage={'Some fucking special ...'}
        time={new Date().toLocaleDateString()}
        userName={'username'}
      />
      <Dialog
        lastMessage={'Some fucking special ...'}
        time={new Date().toLocaleDateString()}
        userName={'username'}
      />
      <Dialog
        lastMessage={'Some fucking special ...'}
        time={new Date().toLocaleDateString()}
        userName={'username'}
      />
    </ul>
  )
}
