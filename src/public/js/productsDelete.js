const id = document.querySelector('#idDelete')
const deleteBtn = document.querySelector('#btnDelete')

const handleDelete = () => {
    const currentId = id.value

    socket.emit('delete-product', currentId)
    id.value = ''
    window.location.reload()
}

deleteBtn.addEventListener('click', handleDelete)