import ReactReconciler from 'react-reconciler'

const hostConfig = {
  getRootHostContext() {
    return {}
  },
  getChildHostContext() {
    return {}
  },
  prepareForCommit() {
    return true
  },
  resetAfterCommit() {},
  shouldSetTextContent(_, props) {
    return typeof props.children === 'string' || typeof props.children === 'number'
  },
  // 创建 DOM 节点
  createInstance(type, newProps, rootContainerInstance, _currentHostContext, workInProgress) {
    const domElement = document.createElement(type)

    Object.keys(newProps).forEach(propName => {
      const propValue = newProps[propName]

      if (propName === 'children') {
        if (typeof propValue === 'string' || typeof propValue === 'number') {
          domElement.textContent = propValue
        }
      } else if (propName === 'onClick') {
        domElement.addEventListener('click', propValue)
      } else if (propName === 'className') {
        domElement.setAttribute('class', propValue)
      } else {
        domElement.setAttribute(propName, propValue)
      }
    })

    return domElement
  },
  // 创建 text 节点
  createTextInstance(text) {
    return document.createTextNode(text)
  },
  finalizeInitialChildren() {},
  clearContainer() {},
  appendInitialChild(parent, child) {
    parent.appendChild(child)
  },
  appendChild(parent, child) {
    parent.appendChild(child)
  },
  supportsMutation: true,
  appendChildToContainer(parent, child) {
    parent.appendChild(child)
  },
  prepareUpdate(domElement, oldProps, newProps) {
    return true
  },
  commitUpdate(domElement, updatePayload, type, oldProps, newProps) {
    Object.keys(newProps).forEach(propName => {
      const propValue = newProps[propName]
      if (propName === 'children') {
        if (typeof propValue === 'string' || typeof propValue === 'number') {
          domElement.textContent = propValue
        }
      } else {
        const propValue = newProps[propName]
        domElement.setAttribute(propName, propValue)
      }
    })
  },
  commitTextUpdate(textInstance, oldText, newText) {
    textInstance.text = newText
  },
  removeChild(parentInstance, child) {
    parentInstance.removeChild(child)
  },
}

const ReactReconcilerInst = ReactReconciler(hostConfig)

export default {
  render(reactElement, domElement, callback) {
    /**
     * FiberRootNode: {
     *  containerInfo: domElement
     *  context: {}
     *  tag: false
     * }
     */
    const FiberRootNode = ReactReconcilerInst.createContainer(domElement, false)

    const FiberNode = FiberRootNode.current

    console.log(FiberRootNode)
    console.log(FiberNode)

    // update the root Container
    return ReactReconcilerInst.updateContainer(reactElement, FiberRootNode, null, callback)
  },
}
