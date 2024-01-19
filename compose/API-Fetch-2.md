## API Call

manifests/android_manifest.xml
```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    package="com.example.nicecompose">
    <uses-permission android:name="android.permission.INTERNET" />
    <application
        android:allowBackup="true"
```

mainActivity.kt
```kotlin
package com.example.nicecompose
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Button
import androidx.compose.material3.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.github.kittinunf.fuel.Fuel
import com.github.kittinunf.fuel.core.FuelError
import com.github.kittinunf.result.Result
import kotlinx.serialization.Serializable
import org.json.JSONArray

@Serializable
data class Todo(
    val userId: Int,
    val id: Int,
    val title: String,
    val completed: Boolean
)

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            MyApp()
        }
    }
}

@Composable
fun MyApp() {
    var todos by remember { mutableStateOf<List<Todo>>(emptyList()) }
    var showAlert by remember { mutableStateOf(false) }
    var message = ""

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp)
    ) {
        // Button to trigger the API call
        Button(onClick = {

            val url = "https://jsonplaceholder.typicode.com/todos"
            Fuel.get(url).responseString { _, _, result ->
                when (result) {

                    is Result.Success -> {

                        val jsonArray = JSONArray(result.value)
                        val todoList = List(jsonArray.length()) { index ->
                            val todoJsonObject = jsonArray.getJSONObject(index)
                            Todo(
                                userId = todoJsonObject.getInt("userId"),
                                id = todoJsonObject.getInt("id"),
                                title = todoJsonObject.getString("title"),
                                completed = todoJsonObject.getBoolean("completed")
                            )
                        }
                        todos = todoList

                    }
                    is Result.Failure -> {
                        val error: FuelError = result.error

                    }
                }
            }
        }) {
            Text("Fetch Todos")
        }

        // Display fetched data in a list
        LazyColumn {
            items(todos) { todo ->
                Text(todo.title)
            }
        }



    }
}
```


build.gradle (app)
```kotlin

dependencies {

    implementation 'androidx.core:core-ktx:1.7.0'
    implementation "androidx.compose.ui:ui:$compose_version"
    implementation 'androidx.compose.material3:material3:1.0.0-alpha01'
    implementation "androidx.compose.ui:ui-tooling-preview:$compose_version"
    implementation 'androidx.lifecycle:lifecycle-runtime-ktx:2.3.1'
    implementation 'androidx.activity:activity-compose:1.3.1'

    // Jetpack Compose
    implementation "androidx.lifecycle:lifecycle-viewmodel-compose:2.4.0"

// Retrofit for network requests
    implementation("com.github.kittinunf.fuel:fuel:2.3.1")
    implementation("com.github.kittinunf.fuel:fuel-android:2.3.1")
    implementation("com.github.kittinunf.fuel:fuel-json:2.3.1")
    implementation("org.jetbrains.kotlinx:kotlinx-serialization-json:1.3.2")


    testImplementation 'junit:junit:4.13.2'
    androidTestImplementation 'androidx.test.ext:junit:1.1.5'
    androidTestImplementation 'androidx.test.espresso:espresso-core:3.5.1'
    androidTestImplementation "androidx.compose.ui:ui-test-junit4:$compose_version"
    debugImplementation "androidx.compose.ui:ui-tooling:$compose_version"
    debugImplementation "androidx.compose.ui:ui-test-manifest:$compose_version"
}
```



