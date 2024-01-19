## API Fetch


   Layout
   Text Styles

### AndroidManifest.xml
```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    package="com.example.nicecompose">
    <uses-permission android:name="android.permission.INTERNET" />
    <application
        android:allowBackup="true"
```


### mainActivity.kt
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
                        showAlert = true // Request is failing
                       // ShowErrorAlert(error.message)
                         message = "A: $error.message"
                        // Handle error
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

        // Show alert on successful request
      /*  if (showAlert) {
            ShowSuccessAlert(onDismiss = { showAlert = false })
        }
*/
        if (showAlert) {
            ShowErrorAlert(message)
        }
    }
}

@Composable
fun ShowErrorAlert(errorMessage: String?) {
    AlertDialog(
        onDismissRequest = { /* Handle dismiss if needed */ },
        title = { Text("Error") },
        text = { Text("$errorMessage") },
        confirmButton = {
            Button(
                onClick = {
                    // Handle button click if needed
                }
            ) {
                Text("OK")
            }
        }
    )
}

@Composable
fun ShowSuccessAlert(onDismiss: () -> Unit) {
    AlertDialog(
        onDismissRequest = { onDismiss() },
        title = { Text("Success") },
        text = { Text("Request succeeded!") },
        confirmButton = {
            Button(
                onClick = {
                    onDismiss()
                }
            ) {
                Text("OK")
            }
        }
    )
}




```
