const divs = document.querySelectorAll('.repos');

divs.forEach(el => el.addEventListener('click', event => {
    const repoName=event.target.innerHTML;
    axios.post("https://graphqlbkend.herokuapp.com/show",{
        name:repoName,
    }).then((response)=>{
        let res=response.data;
        let arr=[];
        let arrmsg=[];
        let arrcollab=[];
        for(i=0;i<res.data.repository.languages.nodes.length;i++){
           arr[i]=res.data.repository.languages.nodes[i].name;
        };
        document.getElementById("name").innerHTML=res.data.repository.name;
        document.getElementById("url").innerHTML=res.data.repository.url;
        document.getElementById("url").setAttribute("href",res.data.repository.url);
        document.getElementById("desc").innerText=res.data.repository.description;
        document.getElementById("cret").innerHTML=res.data.repository.createdAt;
        document.getElementById("idr").innerHTML=res.data.repository.id;
        document.getElementById("isfork").innerHTML=res.data.repository.isFork;
        document.getElementById("nofork").innerHTML=res.data.repository.forkCount;
        document.getElementById("isorg").innerHTML=res.data.repository.isInOrganization;
        document.getElementById("pje").innerHTML=res.data.repository.hasProjectsEnabled;
        document.getElementById("isen").innerHTML=res.data.repository.hasIssuesEnabled;
        document.getElementById("ispr").innerHTML=res.data.repository.isPrivate;
        document.getElementById("push").innerHTML=res.data.repository.pushedAt;
        document.getElementById("push").innerHTML=res.data.repository.pushedAt;
        document.getElementById("nown").innerHTML=res.data.repository.nameWithOwner;
        document.getElementById("updt").innerHTML=res.data.repository.updatedAt;
        document.getElementById("nolang").innerHTML=res.data.repository.languages.totalCount;
        document.getElementById("lang").innerHTML=arr;
        document.getElementById("norelease").innerHTML=res.data.repository.releases.totalCount;
        document.getElementById("nocommitComment").innerHTML=res.data.repository.commitComments.totalCount;
        document.getElementById("staruser").innerHTML=res.data.repository.stargazerCount;
        if(res.data.repository.primaryLanguage!==null){
           document.getElementById("prlang").innerHTML=res.data.repository.primaryLanguage.name;
       }
        if(res.errors.length!==null){
            for(k=0;k<res.errors.length;k++){
                arrmsg[k]=res.errors[k].message;
             };
            document.getElementById("errmsg").innerHTML=arrmsg;
        }
        if(res.data.repository.collaborators!==null){
            for(j=0;j<res.data.repository.collaborators.nodes.length;j++){
                arrcollab[j]=res.data.repository.collaborators.nodes[j];
             };
            document.getElementById("collabcount").innerHTML=res.data.repository.collaborators.totalCount;
            document.getElementById("collab").innerHTML=arrcollab;
        }
    }).catch((err)=>{
        console.log(err);
    })
}));