<template>
    <header class="app-header">
        <div class="logo">
            <h1>CineScope</h1>
        </div>
        <nav>
            <ul>
                <li>
                    <router-link to="/" exact-active-class="active">
                        Home
                    </router-link>
                </li>
                <li>
                    <router-link to="/favorites" exact-active-class="active">
                        My Favorites
                    </router-link>
                </li>
            </ul>
        </nav>
    </header>
</template>
  
<style scoped>
.app-header {
    background-color: #242424;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo h1 {
    color: #FF3162;
    font-size: 48px;
    font-weight: bold;
    margin: 0;
    text-transform: uppercase;
    letter-spacing: 2px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

nav ul {
    list-style: none;
    display: flex;
    align-items: center;
    margin: 0;
    padding: 0;
}

nav li {
    margin-left: 20px;
}

nav a {
    color: #fff;
    text-decoration: none;
    font-size: 18px;
    font-weight: bold;
    padding: 10px 15px;
    border-radius: 5px;
    transition: background-color 0.3s ease;
}

nav a:hover {
    background-color: #555;
}

nav a.active {
    background-color: #FF3162;
    color: #fff;
}

@media (max-width: 600px) {
    .app-header {
        flex-direction: column;
        align-items: center;
    }

    .logo h1 {
        font-size: 48px;
        margin-bottom: 10px;
    }

    nav ul {
        flex-direction: column;
        align-items: center;
    }

    nav li {
        margin: 10px 0;
    }
}
</style>