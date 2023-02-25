
let renderer = new Renderer()
let apiManager = new APIManager()

apiManager.loadData()

$(".generate-user-btn").on("click", () => {
    apiManager.regenerateData()
})
